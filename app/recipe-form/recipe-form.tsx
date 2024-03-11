"use client";

import { useForm } from "react-hook-form";
import { Tags, Recipe } from "../models/recipes";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiComplexInput from "@/components/assets/multi-complex-input";
import MultiInput from "@/components/assets/multi-input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import clearCachesByServerAction from "@/utils/revalidate";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  editRecipe?: Recipe;
  userId: string;
}

const formSchema = z.object({
  active_cook_time: z.string().optional(),
  tags: z.string().array(),
  description: z.string(),
  ingredients: z
    .object({
      amount: z.string(),
      ingredient: z.string(),
    })
    .array(),
  instructions: z.string().array(),
  name: z.string(),
  notes: z.string().array(),
  passive_cook_time: z.string().optional(),
  yield: z.string(),
});

const RecipeForm: React.FC<Props> = ({ editRecipe, userId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active_cook_time: editRecipe?.active_cook_time || undefined,
      tags: editRecipe?.tags || undefined,
      description: editRecipe?.description || undefined,
      ingredients: editRecipe?.ingredients
        ? [...editRecipe?.ingredients, { amount: "", ingredient: "" }]
        : [{ amount: "", ingredient: "" }],
      instructions: editRecipe?.instructions
        ? [...editRecipe.instructions, ""]
        : [""],
      name: editRecipe?.name || "",
      notes: editRecipe?.notes ? [...editRecipe.notes, ""] : [""],
      passive_cook_time: editRecipe?.passive_cook_time || undefined,
      yield: editRecipe?.yield || undefined,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const supabase = createClient();
    // e.preventDefault();

    // if (!session) {
    //   alert("You must be logged in to create a recipe!");
    //   return;
    // }

    // if (editRecipe && session.user.id !== editRecipe.author_id) {
    //   alert("You are not authorized to edit this recipe!");
    //   return;
    // }
    try {
      const newRecipe: Recipe = {
        author_id: editRecipe?.author_id || userId,
        active_cook_time: values.active_cook_time || "-",
        tags: values.tags,
        description: values.description,
        id: editRecipe?.id || Math.floor(Math.random() * 1000000000).toString(),
        ingredients: values.ingredients.slice(0, -1),
        instructions: values.instructions.slice(0, -1),
        name: values.name,
        notes: values.notes.slice(0, -1),
        passive_cook_time: values.passive_cook_time || "-",
        yield: values.yield,
      };
      const { error } = await supabase.from("recipes").upsert(newRecipe);
      if (error) throw error;
      const id = newRecipe.id;
      // setRecipeData(initialRecipeData);
      clearCachesByServerAction(`/recipe/${id}`);
      router.push(`/recipe/${id}`);
    } catch (error) {
      // newRecipe.author_id = session.user.id;
      //   recipeData.created_at = new Date().toISOString();
      //   if (recipeData.ingredients) recipeData.ingredients.pop();
      //   if (recipeData.instructions) recipeData.instructions.pop();
      //   if (recipeData.notes) recipeData.notes.pop();

      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4 mb-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <ToggleGroup
                value={field.value}
                defaultValue={field.value}
                type="multiple"
                onValueChange={field.onChange}
                variant="outline"
                className="justify-start"
              >
                {Tags.map((tag, index) => (
                  <ToggleGroupItem key={index} value={tag}>
                    {tag}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <MultiComplexInput
                  values={field.value}
                  setValues={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <MultiInput values={field.value} setValues={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active_cook_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active Cook Time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passive_cook_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passive Cook Time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yield</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <MultiInput values={field.value} setValues={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {loading && <span className="animate-spin mr-2">⏳</span>}
          {editRecipe ? "Update Recipe" : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;

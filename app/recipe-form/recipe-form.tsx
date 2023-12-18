"use client";

import { useForm } from "react-hook-form";
import { Category, Recipe } from "../models/recipes";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiComplexInput from "@/components/assets/multi-complex-input";
import MultiInput from "@/components/assets/multi-input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import router from "next/router";

interface Props {
  editRecipe?: Recipe;
}

const formSchema = z.object({
  active_cook_time: z.string(),
  category: z.nativeEnum(Category),
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
  passive_cook_time: z.string(),
  yield: z.string(),
});

// const categoryOptions = [
//   "breakfast",
//   "meal",
//   "snack",
//   "dessert",
//   "drink",
//   "soup",
//   "baking",
//   "other",
// ];

const RecipeForm: React.FC<Props> = ({ editRecipe }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active_cook_time: editRecipe?.active_cook_time || undefined,
      category: editRecipe?.category || undefined,
      description: editRecipe?.description || undefined,
      ingredients: editRecipe?.ingredients || [{ amount: "", ingredient: "" }],
      instructions: editRecipe?.instructions || [""],
      name: editRecipe?.name || "",
      notes: editRecipe?.notes || [""],
      passive_cook_time: editRecipe?.passive_cook_time || undefined,
      yield: editRecipe?.yield || undefined,
    },
  });

  // const initialRecipeData: Recipe = editRecipe || {
  //   author_id: "",
  //   active_cook_time: null,
  //   category: null,
  //   description: null,
  //   id: Math.floor(Math.random() * 1000000000),
  //   ingredients: [{ amount: "", ingredient: "" }],
  //   instructions: [""],
  //   name: "",
  //   notes: [""],
  //   passive_cook_time: null,
  //   yield: null,
  // };

  //   const handleInputChange = (
  //     name: string,
  //     value: string | string[] | Ingredient[]
  //   ) => {
  //     setRecipeData({ ...recipeData, [name]: value });
  //   };

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
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
        author_id: "",
        active_cook_time: values.active_cook_time,
        category: values.category,
        description: values.description,
        id: Math.floor(Math.random() * 1000000000).toString(),
        ingredients: values.ingredients.slice(0, -1),
        instructions: values.instructions.slice(0, -1),
        name: values.name,
        notes: values.notes.slice(0, -1),
        passive_cook_time: values.passive_cook_time,
        yield: values.yield,
      };
      const { error } = await supabase.from("recipes").upsert(newRecipe);
      if (error) throw error;
      const id = newRecipe.id;
      // setRecipeData(initialRecipeData);
      router.push(`/${id}`);
    } catch (error) {
      // newRecipe.author_id = session.user.id;
      //   recipeData.created_at = new Date().toISOString();
      //   if (recipeData.ingredients) recipeData.ingredients.pop();
      //   if (recipeData.instructions) recipeData.instructions.pop();
      //   if (recipeData.notes) recipeData.notes.pop();

      alert("Error updating the data!");
      console.log(error);
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category).map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          {editRecipe ? "Update Recipe" : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;

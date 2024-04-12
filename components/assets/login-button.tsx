"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHamburger,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useUserStore } from "@/stores/user-store";

config.autoAddCss = false;

export default function LoginButton() {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(undefined);
    router.refresh();
  };

  return (
    <div className="absolute top-2 right-2 flex gap-x-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg">
          Menu <FontAwesomeIcon icon={faHamburger} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {user ? (
            <>
              <Link href="/recipe-form">
                <DropdownMenuItem className="focus:bg-foreground focus:text-background">
                  <button
                    type="button"
                    className="text-lg flex justify-between items-center w-full"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Create</span>
                  </button>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="focus:bg-foreground focus:text-background">
                  <button
                    type="button"
                    className="text-lg flex justify-between items-center w-full"
                  >
                    <FontAwesomeIcon icon={faGear} />
                    <span>Settings</span>
                  </button>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="focus:bg-red-400 focus:text-white">
                <form action={signOut} className="w-full">
                  <button
                    type="submit"
                    className="text-lg flex justify-between items-center w-full"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </>
          ) : (
            <Link href="login">
              <DropdownMenuItem className="focus:bg-foreground focus:text-background">
                <button
                  type="button"
                  className="text-lg flex justify-between items-center w-full"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Login</span>
                </button>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

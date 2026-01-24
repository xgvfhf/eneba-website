import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, FileText, User, LogOut, BookOpen } from "lucide-react";

interface HeaderProps {
  onShowInstructions: () => void;
  onSidebarToggle: () => void;
}

export function Header({ onShowInstructions, onSidebarToggle }: HeaderProps) {
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogout = () => {
    // Mock logout
    alert("Logout functionality will be available with Supabase integration");
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
            >
              <Menu className="size-6" />
            </Button>
            <div className="flex items-center gap-3">
              <FileText className="size-8 text-blue-600" />
              <div>
                <h1 className="text-2xl lg:text-3xl">AI CV Generator</h1>
                <p className="text-gray-600 text-sm hidden sm:block">
                  Create the perfect resume with artificial intelligence
                </p>
              </div>
            </div>
          </div>

          <DropdownMenu open={accountOpen} onOpenChange={setAccountOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="size-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onShowInstructions}>
                <BookOpen className="size-4 mr-2" />
                Instructions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="size-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
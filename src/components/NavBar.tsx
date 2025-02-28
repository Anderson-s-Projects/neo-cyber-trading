import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Home, LogOut, User, BookOpen, Newspaper, Settings } from "lucide-react";
export const NavBar = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSignOut = async () => {
    try {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  return <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center py-0 px-[11px]">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              NeoMarket
            </span>
          </a>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <Button variant="ghost" size="sm" className="flex items-center" onClick={() => navigate('/dashboard')}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center" onClick={() => navigate('/tutorial')}>
              <BookOpen className="mr-2 h-4 w-4" />
              Tutorial
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center" onClick={() => navigate('/news')}>
              <Newspaper className="mr-2 h-4 w-4" />
              News
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center" onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center" onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-100">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </nav>;
};
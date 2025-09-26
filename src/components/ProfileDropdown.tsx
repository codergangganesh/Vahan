import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Bike, Calendar, LogOut, Power } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ProfileDropdownProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const ProfileDropdown = ({ onNavigate, onLogout }: ProfileDropdownProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter (hover)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  // Handle mouse leave (hover)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500); // Delay closing to allow moving to dropdown content
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!user) return null;

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  // Get user's display name
  const getUserName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user.email?.split('@')[0] || 'User';
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-primary hover:bg-accent"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={getUserName()} />
              <AvatarFallback className="bg-gradient-hero text-white font-medium">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56" 
          align="end" 
          forceMount
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{getUserName()}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors" 
              onClick={() => onNavigate('sell')}
            >
              <Bike className="mr-2 h-4 w-4" />
              <span>Sell Your Bike</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors" 
              onClick={() => onNavigate('book-test-ride')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Book Test Ride</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-200" 
            onClick={onLogout}
          >
            <Power className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
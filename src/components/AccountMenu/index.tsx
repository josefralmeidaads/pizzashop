import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Building, ChevronDown, LogOut } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/getProfille';
import { getManagedRestaurant } from '@/api/getManagedRestaurant';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogTrigger } from '../ui/dialog';
import StoreProfileDialog from '../StoreProfileDialog';
import { signOut } from '@/api/signOut';
import { useNavigate } from 'react-router-dom';

const AccountMenu = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigninOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    }
  })

  return (
  <Dialog>  
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button 
        variant="outline"
        className="flex items-center gap-2 select-none"
      >
        {isLoadingManagedRestaurant ? 
          <Skeleton className="h-4 w-40"/>
          : 
          managedRestaurant?.name
        }
        <ChevronDown />
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {
            isLoadingProfile ? 
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32"/>
              <Skeleton className="h-4 w-24"/>
            </div>
              :
            <>  
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
              </>
          }
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem >
            <Building className="w-4 h-4 mr-2"/>
            <span>Perfil da loja</span>
          </DropdownMenuItem>
        </DialogTrigger>

        <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigninOut}>
          <button className="w-full" onClick={() => signOutFn()}>
            <LogOut className="w-4 h-4 mr-2"/>
            <span>logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <StoreProfileDialog />
  </Dialog>
  );
}

export default AccountMenu;
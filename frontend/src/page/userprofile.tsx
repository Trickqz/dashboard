import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface User {
    username: string;
    name: string;
    email: string;
}

function UserProfile() {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/profile/${username}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }, [username]);

    if (!user) {
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px] sm:min-h-[340px] items-center flex justify-center">
                <div className='flex-col flex items-center'>
                    <Avatar className='w-32 h-auto'>
                        <AvatarImage src="https://github.com/Trickqz.png" alt="@Trickqz" />
                    </Avatar>
                    <h1 className='text-xl font-medium mt-6'>{user.username}</h1>
                    <p className='text-base text-[hsl(var(--muted-foreground))]'>{user.name}</p>
                    <p className='text-sm text-[hsl(var(--muted-foreground))] opacity-40'>{user.email}</p>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UserProfile;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/header';

interface User {
    username: string;
    name: string;
    email: string;
}

function UserProfile() {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:3000/profile/${username}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar dados do usuário:', error);
                });
        } else {
            console.error('Username não encontrado na URL');
        }
    }, [username]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <Header />
            <div className='w-full dark:bg-zinc-900 h-64 flex justify-center relative'>
                <Avatar className='absolute w-40 h-40 bottom-[-70px] border-[7px] dark:border-zinc-950'>
                    <AvatarImage src="https://github.com/Trickqz.png" alt="@Trickqz" />
                </Avatar>
            </div>
            <div>
                <div className='items-center flex mt-16 flex-col'>
                    <h1 className='text-xl font-medium mt-6'>{user.username}</h1>
                    <p className='text-base text-[hsl(var(--muted-foreground))]'>{user.name}</p>
                    <p className='text-sm text-[hsl(var(--muted-foreground))] opacity-40'>{user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
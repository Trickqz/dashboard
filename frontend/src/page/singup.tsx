import axios from 'axios';
import InputMask from 'react-input-mask';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    sex: z.string().optional(),
    country: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }),
    username: z.string().min(5, { message: "Username must be at least 5 characters." }).max(60),
    password: z.string().min(5, { message: "Password must be at least 5 characters." }).max(15),
    confirmpassword: z.string().min(5, { message: "Confirm Password is required." }).max(15),
}).refine(data => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
});

export function Signup() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: any) => {
        data.sex = data.sex || 'not specified';
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, data);
            const { message } = response.data;
            alert(message);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            alert('Erro ao fazer cadastro. Verifique suas informações.');
        }
    };

    const [country, setCountry] = useState('BR');
    const [mask, setMask] = useState('(99) 99999-9999');

    const handleCountryChange = (value: string) => {
        setCountry(value);
        switch (value) {
            case 'BR':
                setMask('(99) 99999-9999');
                break;
            case 'US':
                setMask('(999) 999-9999');
                break;
            default:
                setMask('(99) 99999-9999');
                break;
        }
    };

    return (
        <div className="flex h-[100vh] flex-row justify-center items-center">
            <div className="w-2/4 h-full relative bg-[hsl(var(--accent2))] border-r border-[hsl(var(--border))] overflow-hidden hidden lg:block">
                <BorderBeam size={250} duration={12} delay={9} />
            </div>
            <div className="h-full lg:w-2/4 relative overflow-y-auto w-full flex justify-center items-center">
                <div className="absolute top-10 right-10">
                    <ModeToggle />
                </div>
                <div>
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">Sign up for an account</h1>
                        <p className="text-sm text-muted-foreground">Enter your details below to create an account.</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-6 sm:min-w-[400px]">
                            {step === 1 && (
                                <>
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input className="h-10" type="text" placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="sex" render={() => (
                                        <FormItem>
                                            <FormLabel>Sex</FormLabel>
                                            <FormControl>
                                                <Select>
                                                    <SelectTrigger className="w-full h-10">
                                                        <SelectValue placeholder="Select a gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Sex</SelectLabel>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="country" render={() => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Select value={country} onValueChange={handleCountryChange}>
                                                    <SelectTrigger className="w-full h-10">
                                                        <SelectValue placeholder="Select a country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Country</SelectLabel>
                                                            <SelectItem value="US">United States</SelectItem>
                                                            <SelectItem value="BR">Brazil</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <InputMask className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex" type="text" placeholder="Enter your phone number" mask={mask} value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <Button type="button" onClick={() => setStep(2)} className="w-full h-10">Next</Button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input className="h-10" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                        <FormField control={form.control} name="username" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" placeholder="Enter your username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="password" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="password" placeholder="Enter your password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="confirmpassword" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="password" placeholder="Enter your password again" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <div className="flex justify-between">
                                            <Undo2 className='absolute top-14 left-14 cursor-pointer hover:opacity-50 transition-all' color='hsl(var(--primary))' width={24} onClick={() => setStep(1)} />
                                            <Button type="submit" className="w-full h-10">Create Account</Button>

                                        </div>
                                    </>
                            )}
                                </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
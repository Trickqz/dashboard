import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }).max(60),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }).max(15),
});

export function Signin() {
  const navigate   = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setTimeout(() => {
        navigate('/dashboard');
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex h-[100vh] flex-row justify-center items-center">
      <div className="w-2/4 h-full relative bg-[hsl(var(--accent2))] border-r border-[hsl(var(--border))] overflow-hidden hidden lg:block">
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="h-full lg:w-2/4 w-full flex justify-center items-center">
        <div className="absolute top-10 right-10">
          <ModeToggle />
        </div>
        <div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Log in to an account</h1>
            <p className="text-sm text-muted-foreground">Enter your username and password below to log in.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-6 sm:min-w-[400px]">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="h-10" placeholder="enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="h-10" type="password" placeholder="enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full h-10">Enter</Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full h-10 font-medium" type="button">
                <svg className="h-4 w-4 mr-2" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                  <path d="M56.281 165.372c-2.91-8.407-4.573-17.493-4.573-26.732 0-9.239 1.572-18.326 4.453-26.747-26.366-14.794-44.837-42.509-44.837-73.945-13.373-8.629-21.573-20.975-22.871-34.713L-1.535 35.155C6.697 73.457 34.793 105.728 67.106 121.786l-.592 1.534c-8.541 14.372-13.034 30.423-13.034 48.052 0 17.752 4.394 33.809 12.43 49.078l-2.146.442L56.281 165.372" fill="#FBBB00"/>
                  <path d="M67.103 47.455c-10.772-14.358-25.644-25.807-42.818-32.66L24.34 21.464C10.434 35.774-1.573 56.33-1.573 79.168c0 31.417 18.477 59.15 44.575 73.007l.634-1.368c-20.688-13.527-32.186-33.035-32.186-54.123 0-19.716 10.294-37.433 25.316-48.306L67.103 47.455" fill="#EA4335"/>
                </svg>
                <span className="ml-2">Google</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
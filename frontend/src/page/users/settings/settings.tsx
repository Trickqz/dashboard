import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    fullname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(6, {
        message: "email must be at least 6 characters.",
    }),
    phone: z.string().min(6, {
        message: "phone must be at least 8 numbers.",
    }),
    password: z.string().min(5, { message: "Password must be at least 5 characters." }).max(15),
    confirmpassword: z.string().min(5, { message: "Confirm Password is required." }).max(15),
}).refine(data => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
});

export default function Settings() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <html className="overflow-y-hidden">
            <div className="p-3 sm:p-10 overflow-y-hidden">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="lg:w-1/5">
                        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                            <a className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start" href="/settings">Profile</a>
                            <a className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start" href="/settings">Account</a>
                            <a className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start" href="/examples/forms/notifications">Notifications</a>
                        </nav>
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Profile</h3>
                                <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
                            </div>
                            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="fullname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="text" placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="email" placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="number" placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="password" placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmpassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password Confirm</FormLabel>
                                                <FormControl>
                                                    <Input className="h-10" type="password" placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="sm:w-auto w-full" type="submit">Update Profile</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </html>
    )
}
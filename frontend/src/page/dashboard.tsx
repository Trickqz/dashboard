import { Navigation } from "@/components/navigation"
import Header from "../components/header"
import { DockDemo } from "@/components/dockdemo"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Overview from "./dashboard/overview"
import Analytics from "./dashboard/analytics"
import Notifications from "./dashboard/notifications"

export function Dashboard() {
    return (
        <div>
            <Header />
            <DockDemo />
            <div className="p-3 sm:p-14">
                <Navigation />
                <Tabs defaultValue="overview" className="mt-9">
                    <TabsList className="grid w-full grid-cols-3 h-10 lg:max-w-[400px]">
                        <TabsTrigger className="h-8" value="overview">Overview</TabsTrigger>
                        <TabsTrigger className="h-8" value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger className="h-8" value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Overview />
                    </TabsContent>
                    <TabsContent value="analytics">
                        <Analytics />
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Notifications />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
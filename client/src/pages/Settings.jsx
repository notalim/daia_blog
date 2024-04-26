import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@src/@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@src/@/components/ui/card";
import AccountPage from "../components/SettingsPage/Account.jsx";
import HealthPage from "../components/SettingsPage/Health.jsx";
import NotificationsPage from "../components/SettingsPage/Notifications.jsx";

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 lg:px-8 my-8 max-w-7xl">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>
                                Manage your account settings and information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <AccountPage user={user} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="health">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Health Settings</CardTitle>
                            <CardDescription>
                                Manage your health-related settings and
                                preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <HealthPage user={user} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>
                                Manage your notification preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <NotificationsPage user={user} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;

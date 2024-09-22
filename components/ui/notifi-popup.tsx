'use client'
import React, { useEffect, useState, CSSProperties } from "react";
import { IoIosNotifications } from "react-icons/io";
import { ScrollArea } from "./scroll-area";
import { Notification, Role } from "@prisma/client";
import FetchNotification from "@/lib/fetch/notification";
import { insure_user_authenticated } from "@/lib/helper";
import { Button } from "./button";
import showNotification from "@/lib/actions/notification";
import { Popover } from "./popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import ClipLoader from "react-spinners/ClipLoader";

function Notifypopup() {
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<Role>();
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);
    const color = 'white'


    useEffect(() => {
        async function getNotification() {
            try {
                const { role, id } = await insure_user_authenticated();
                setRole(role)// Ensure this function returns correctly
                setLoading(true);

                const data = await FetchNotification(role, id); // Fetch the notifications based on role
                setNotifications(data); // Set the notifications in state
            } catch (error) {
                console.error("Error fetching notifications:", error); // Log any errors
            } finally {
                setLoading(false); // Set loading state to false
            }
        }

        getNotification();
    }, []);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="relative">
                        {notifications && notifications.filter(it => it.showed === false).length > 0 && <span
                            className="rounded-full absolute ring-1 ring-white
                        justify-center h-[12px] text-[10px] border border-black w-[12px] right-1 top-1 flex items-center
                        bg-white"
                        >
                            {/* Calculate the length of the filtered notifications and display the number */}
                            {notifications ? notifications.filter(it => it.showed === false).length : 0}
                        </span>}
                        <IoIosNotifications
                            onClick={() => setPopup(!popup)}
                            className="text-3xl text-[#CB8C06] cursor-pointer"
                        />
                    </div>

                </PopoverTrigger>
                <PopoverContent className="absolute top-4  z-50 right-0">
                    <div className=" h-96  flex flex-col gap-2 w-96 rounded shadow-md bg-[#CB8C06] p-1 ">
                        {loading ? <ClipLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                            : (<>
                                <div className="relative">
                                    <h1 className="absolute top-0 text-white w-full z-10 bg-[#CB8C06]">Notifications</h1>
                                </div>
                                <ScrollArea>
                                    <div className="flex flex-col gap-1 mt-10">
                                        {notifications && notifications.length > 0 ? (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`${notification.showed ? 'bg-white' : 'bg-gray-200'} w-full flex flex-col gap-2 p-2 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer `}
                                                >
                                                    <h1>{notification.content}</h1>
                                                    <Button
                                                        type="button"
                                                        onClick={async () => {
                                                            if (role) {
                                                                await showNotification(notification.id, notification.planId, role)
                                                            }
                                                        }}
                                                        className="rounded bg-[#CB8C06] w-fit px-1 text-white"
                                                    >
                                                        Show me
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No notifications available</p>
                                        )}
                                    </div>
                                </ScrollArea>
                            </>)
                        }
                    </div>

                </PopoverContent>
            </Popover>
        </>
    );
}

export default Notifypopup;

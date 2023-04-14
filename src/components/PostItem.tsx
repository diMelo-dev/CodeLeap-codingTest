import { useEffect, useState } from "react";
import { PostItemType } from "../types/PostItemType";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";

type Props = {
    data: PostItemType,
    getPosts: (offset: number) => void
}


export function PostItem({data, getPosts}: Props) {

    const user = useAppSelector(state => state.user);

    const [isUser, setIsUser] = useState(false);
    const [activeDelete, setActiveDelete] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);

    function formatDate(data: Date) {
        const now = new Date();
        const postDate = new Date(data);

        if(
            postDate.getDate() === now.getDate() &&
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear()
        ) {
            return timeAgo(now, postDate)
        }  else {
            return `${postDate.getMonth()+1}/${postDate.getDate()}/${postDate.getFullYear()}`
        }
        
        
    }

    function timeAgo(now: Date, postDate: Date) {
        
        const minutesDifference = Math.floor(Math.abs(now.getTime() - postDate.getTime())/60000);

        if(minutesDifference >= 0 && minutesDifference < 60) {
            if(minutesDifference === 0 || minutesDifference === 1) {
                return '1 minute ago';
            } else {
                return `${minutesDifference} minutes ago`;
            }
        } else {
            const hourDifference = now.getHours() - postDate.getHours();
            if(hourDifference <= 1) {
                return '1 hour ago';
            } else {
                return `${hourDifference} hours ago`;
            }
        }
    }

    function handleModalDeleteClick() {
        if(!activeDelete) {
            setActiveDelete(true);
        } else {
            setActiveDelete(false);
        }
    }

    function handleModalEditClick() {
        if(!activeEdit) {
            setActiveEdit(true);
        } else {
            setActiveEdit(false);
        }
    }

    useEffect(() => {
        if(user.name === data.username) {
            setIsUser(true);
        } else {
            setIsUser(false);
        }
    }, [user]);


    return(
        <div className="max-w-[752px] w-full">
            <div className="min-h-[70px] p-6 flex flex-col items-center rounded-t-2xl bg-[#7695EC] sm:flex-row">
                <h1 className="flex-1 self-start text-[22px] text-white leading-[26px] font-bold break-all">{data.title}</h1>


                {isUser && 
                    <div className="self-end flex gap-[34.2px]">
                        
                        <div onClick={handleModalDeleteClick} className="cursor-pointer">
                            <svg width="19" height="22" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.80087 20.75C1.80087 22.125 2.971 23.25 4.40115 23.25H14.8023C16.2324 23.25 17.4025 22.125 17.4025 20.75V5.75H1.80087V20.75ZM4.99921 11.85L6.83241 10.0875L9.6017 12.7375L12.358 10.0875L14.1912 11.85L11.4349 14.5L14.1912 17.15L12.358 18.9125L9.6017 16.2625L6.84541 18.9125L5.01221 17.15L7.76851 14.5L4.99921 11.85ZM14.1522 2L12.852 0.75H6.35136L5.05122 2H0.500732V4.5H18.7027V2H14.1522Z" fill="white"/>
                            </svg>
                        </div>

                        <div onClick={handleModalEditClick} className="cursor-pointer">
                            <svg width="23" height="22" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m7 17.011 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414 0-.534-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.581v4.43ZM18.045 4.456l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58ZM9 13.416l6.03-5.974 1.586 1.586L10.587 15 9 15.004v-1.589Z"></path>
                                <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2Z"></path>
                            </svg>
                        </div>

                    </div>
                }
            </div>

            <div className="p-6 flex flex-col gap-4 border-[1px] border-t-0 border-[#999] rounded-b-2xl text-[18px] leading-[21px]">

                <div className="flex flex-col justify-between gap-2 text-[#777] sm:flex-row">

                    <div className="font-bold break-all">@{data.username}</div>

                    <div className="self-end">{formatDate(data.created_datetime)}</div>

                </div>

                <div className="text-black break-all">{data.content}</div>

            </div>

            
            <DeleteModal active={activeDelete} cancelClick={handleModalDeleteClick} postId={data.id} getPosts={getPosts} />
        
            <EditModal active={activeEdit} cancelClick={handleModalEditClick} post={data} getPosts={getPosts} />
        </div>
    );
}
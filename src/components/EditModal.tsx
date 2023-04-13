import { useState } from "react";
import { PostItemType } from "../types/PostItemType";
import useApi from '../actions/requests';

type Props = {
    active: boolean,
    cancelClick: () => void,
    post: PostItemType,
    getPosts: (offset: number) => void
}

export function EditModal({active, cancelClick, post, getPosts}: Props) {

    const api = useApi();

    const [titleField, setTitleField] = useState(post.title);
    const [contentField, setContentField] = useState(post.content);

    async function handleSaveClick() {
        const json = await api.editPost(post.id, titleField, contentField);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        getPosts(0);
        cancelClick();
    }

    function handleCancelClick() {
        setTitleField(post.title);
        setContentField(post.content);
        cancelClick();
    }

    return(
        <div className={`fixed top-0 left-0 w-full ${active ? 'h-screen p-3' : 'h-0'}  flex items-center justify-center bg-[#777]/80 overflow-hidden transition-all`}>
            <div className="max-w-[660px] w-full min-h-[334px] p-6 flex flex-col gap-6 border-[1px] border-[#999] rounded-2xl bg-white">

                <h1 className="text-[22px] leading-[26px] font-bold">
                    Edit item
                </h1>

                <form method="PATCH" autoComplete="off" className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className=" text-[16px] leading-[19px]" htmlFor="title_input">Title</label>

                        <input 
                            type='text'
                            id='title_input' 
                            name='title_input' 
                            value={titleField} 
                            placeholder="Hello world"
                            onChange={(e) => setTitleField(e.target.value)} 
                            className=" py-2 px-[9.56px] border-[1px] border-[#777] rounded-lg outline-none" 
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className=" text-[16px] leading-[19px]" htmlFor="content_input">Content</label>

                        <textarea 
                        id='content_input' 
                        name='content_input'
                        value={contentField}
                        placeholder="Content here"
                        onChange={(e) => setContentField(e.target.value)} 
                        className=" h-[74px] py-2 px-[10.68px] border-[1px] border-[#777] rounded-lg outline-none resize-none" />
                    </div>

                    <div className="w-full flex gap-4 text-[16px] leading-[19px] font-bold">

                        <div onClick={() => handleCancelClick()} className="ml-auto max-w-[120px] w-full min-h-[32px] flex items-center justify-center border-[1px] border-[#000] rounded-lg cursor-pointer">
                            Cancel
                        </div>

                        <div onClick={handleSaveClick} className="max-w-[120px] w-full min-h-[32px] flex items-center justify-center rounded-lg bg-[#47B960] text-white cursor-pointer transition-all hover:bg-[#47B960]/90">
                            Save
                        </div>

                    </div>

                </form>


            </div>
        </div>
    );
}
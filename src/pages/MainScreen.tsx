import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { posts } from "../helpers/data";
import { PostItemType } from "../types/PostItemType";
import { PostItem } from "../components/PostItem";
import useApi from '../actions/requests';

export function MainScreen() {

    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const api = useApi();

    const [activeButton, setActiveButton] = useState(false);
    const [titleField, setTitleField] = useState('');
    const [contentField, setContentField] = useState('');
    const [postList, setPostList] = useState<PostItemType[]>([]);
    const [offset, setOffset] = useState(0);

    function handleCreateClick() {
        if(activeButton) {
            //Envio o formulário
        }
    }

    useEffect(() => {
        if(user.name === '') {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if(titleField.trim() !== '' && contentField.trim() !== '') {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [titleField, contentField]);

    useEffect(() => {
        const getPosts = async () => {
            const json = await api.getPosts(offset);
            setPostList(json.results);
        };
        getPosts(); 
    }, []);

    return(
        <div className="min-h-screen px-3 flex flex-col items-center bg-[#dddddd]">
            <div className="max-w-[800px] w-full flex flex-col bg-white">
                <h1 className="min-h-[80px] py-[27px] px-[37px] text-[22px] text-white leading-[26px] font-bold bg-[#7695EC]">
                    CodeLeap Network
                </h1>

                <div className="p-6 flex flex-col gap-6">

                    <div className="w-full min-h-[334px] p-6 flex flex-col gap-6 border-[1px] border-[#999] rounded-2xl">
                        <h2 className="text-[22px] leading-[26px] font-bold">What's on your mind?</h2>
                        
                        <form method="POST" autoComplete="off" className="flex flex-col gap-6">
                            
                            <div className="flex flex-col gap-2">
                                <label className=" text-[16px] leading-[19px]" htmlFor="title_input">Title</label>

                                <input 
                                    type='text'
                                    id='title_input' 
                                    name='title_input' 
                                    value={titleField} 
                                    placeholder="Hello world"
                                    onChange={(e) => setTitleField(e.target.value)} 
                                    className=" py-2 px-[10.68px] border-[1px] border-[#777] rounded-lg outline-none" 
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

                            <div onClick={handleCreateClick} className={`w-[120px] h-[32px] self-end flex items-center justify-center rounded-lg ${activeButton ? 'bg-[#7695EC] hover:bg-[#7695EC]/90' : 'bg-[#7695EC]/70'} text-[16px] text-white leading-[19px] font-bold transition-all cursor-pointer`}>Create</div>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6">
                        {postList.map((item, index) => (
                            <PostItem key={item.id} data={item} />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
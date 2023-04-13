import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { PostItemType } from "../types/PostItemType";
import { PostItem } from "../components/PostItem";
import useApi from '../actions/requests';
import { FakeLoading } from "../components/FakeLoading";
import { DeleteModal } from "../components/DeleteModal";

export function MainScreen() {

    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const api = useApi();

    const [activeButton, setActiveButton] = useState(false);
    const [titleField, setTitleField] = useState('');
    const [contentField, setContentField] = useState('');
    const [postList, setPostList] = useState<PostItemType[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeDelete, setActiveDelete] = useState(false);

    async function handleCreateClick(e: React.FormEvent) {
        e.preventDefault();
        if(activeButton) {
            //Envio o formulário
            const json = await api.createPost(user.name, titleField, contentField);
            setTitleField('');
            setContentField('');
            getPosts(0);
        }
    }

    async function getPosts(offset: number) {
        setLoading(true);
        const json = await api.getPosts(offset);
        setPostList(json.results);
        setLoading(false);
    }

    function handlePaginationClick(button: number)  {
        if(button === 1) {
            setOffset(offset + 10);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            if(offset > 0) {
                setOffset(offset - 10);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
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
        getPosts(offset); 
    }, [offset]);

    

    return(
        <div className="relative min-h-screen px-3 flex flex-col items-center bg-[#dddddd]">
            <div className="max-w-[800px] w-full flex flex-col bg-white">
                <h1 className="min-h-[80px] py-[27px] px-[37px] text-[22px] text-white leading-[26px] font-bold bg-[#7695EC]">
                    CodeLeap Network
                </h1>

                <div className="p-6 flex flex-col gap-6">

                    <div className="w-full min-h-[334px] p-6 flex flex-col gap-6 border-[1px] border-[#999] rounded-2xl">
                        <h2 className="text-[22px] leading-[26px] font-bold">What's on your mind?</h2>
                        
                        <form onSubmit={(e: React.FormEvent) => handleCreateClick(e)} method="POST" autoComplete="off" className="flex flex-col gap-6">
                            
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
                        {postList && loading && 
                            <div className="max-w-[752px] w-full">

                                <div className="min-h-[70px] p-6 flex items-center rounded-t-2xl bg-[#7695EC]">
                                    <FakeLoading height="md" />
                                </div>

                                <div className="p-6 flex flex-col gap-4 border-[1px] border-t-0 border-[#999] rounded-b-2xl">
                                    <FakeLoading height="sm" />

                                    <FakeLoading height="lg" />
                                </div>

                            </div>
                        }

                        {postList.length === 0 && !loading && 
                            <div className="text-center text-[22px] leading-[26px] font-bold">No posts found</div>
                        }

                        {postList && !loading && 
                            postList.map((item, index) => (
                                <PostItem key={item.id} data={item} getPosts={getPosts} />
                            ))
                        }
                    </div>

                    <div className="flex justify-center gap-3 text-[18px] text-white font-bold leading-[21px]">

                        <div onClick={() => handlePaginationClick(0)} className={`w-[120px] p-2 flex items-center justify-center rounded-2xl ${offset > 0 ? 'bg-[#7695EC] hover:bg-[#7695EC]/90' : 'bg-[#7695EC]/70'}  cursor-pointer transition-all `}>
                            <svg width="25" height="25" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41Z"></path>
                            </svg>
                            <span className="flex-1 text-left">Previous</span>
                        </div>

                        <div onClick={() => handlePaginationClick(1)} className="w-[120px] p-2 flex items-center justify-center rounded-2xl bg-[#7695EC] cursor-pointer transition-all hover:bg-[#7695EC]/90">
                            <span className="flex-1 text-right">Next</span>
                            <svg width="25" height="25" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z"></path>
                            </svg>
                        </div>
                    </div>

                </div>

            </div>

            
        </div>
    );
}
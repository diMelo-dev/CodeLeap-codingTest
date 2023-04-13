import useApi from '../actions/requests'


type Props = {
    active: boolean,
    cancelClick: () => void,
    postId: number,
    getPosts: (offset: number) => void
}

export function DeleteModal({active, cancelClick, postId, getPosts}: Props) {

    const api = useApi();

    async function handleDeleteClick() {
        //Faço a req para deletar
        const json = await api.deletePost(postId);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        getPosts(0);
        cancelClick();
    }


    return(
        <div className={`fixed top-0 left-0 w-full ${active ? 'h-screen p-3' : 'h-0'}  flex items-center justify-center bg-[#777]/80 overflow-hidden transition-all`}>
            <div className={`max-w-[660px] w-full min-h-[146px] p-6 flex flex-col gap-10 border-[1px] border-[#999] rounded-2xl bg-white`}>

                <h1 className="text-[22px] leading-[26px] font-bold">Are you sure you want to delete this item?</h1>

                <div className="w-full flex gap-4 text-[16px] leading-[19px] font-bold">

                    <div onClick={cancelClick} className="ml-auto max-w-[120px] w-full min-h-[32px] flex items-center justify-center border-[1px] border-[#999] rounded-lg cursor-pointer">
                        Cancel
                    </div>

                    <div onClick={handleDeleteClick} className="max-w-[120px] w-full min-h-[32px] flex items-center justify-center border-[1px] border-[#999] rounded-lg bg-[#FF5151] text-white cursor-pointer transition-all hover:bg-[#FF5151]/90">
                        Delete
                    </div>

                </div>

            </div>
        </div>
    );
}
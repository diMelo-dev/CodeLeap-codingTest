

export function NotFound() {

    return(
        <div className="min-h-screen p-3 flex flex-col items-center justify-center bg-[#dddddd]">
            <div className="max-w-[500px] w-full min-h-[205px] p-6 flex flex-col items-center justify-center gap-6 bg-white border-[1px] rounded-[16px] border-[#ccc]">
                <h1 className="text-[22px] leading-[26px] font-bold">
                    Page Not Found
                </h1>
            </div>
        </div>
    );
}
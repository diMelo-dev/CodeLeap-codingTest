import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector"; 
import { setName } from "../redux/reducers/userReducer"; 

export function SignUp() {

    const dispatch = useDispatch();
    const user = useAppSelector(state => state.user);

    const [userField, setUserField] = useState('');
    const [activeButton, setActiveButton] = useState(false);
    const navigate = useNavigate();

    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setUserField(e.target.value);
    }

    function handleEnterClick() {
        if(activeButton) {
            dispatch( setName(userField) );
            navigate('/main-screen');
        }
    }

    useEffect(() => {
        if(userField.trim() !== '') {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [userField]);

    return(
        <div className="min-h-screen p-3 flex flex-col items-center justify-center bg-[#dddddd]">
            <div className="max-w-[500px] w-full min-h-[205px] p-6 flex flex-col gap-6 bg-white border-[1px] rounded-[16px] border-[#ccc]">
                <h1 className="text-[22px] leading-[26px] font-bold">
                    Welcome to CodeLeap network!
                </h1>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className=" text-[16px] leading-[19px]">Please enter your username</h2>
                        <input type='text' placeholder="John doe" onChange={handleNameInput} value={userField} className=" h-8 py-2 px-3 border-[1px] border-[#777] rounded-lg outline-none" />
                    </div>

                    <div onClick={handleEnterClick} className={`w-[111px] h-8 py-[6.79px] rounded-lg self-end flex items-center justify-center ${activeButton ? 'bg-[#7695EC] hover:bg-[#7695EC]/90' : 'bg-[#7695EC]/70'} font-bold text-[16px] text-white leading-[19px] cursor-pointer transition-all`}>ENTER</div>
                </div>
            </div>
        </div>
    );
}
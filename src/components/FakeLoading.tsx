
type Props = {
    height: 'sm' | 'md' | 'lg';
}

export function FakeLoading({ height }: Props) {

    let fakeLoadingHeight: string = '';

    switch(height) {
        case 'sm' : 
            fakeLoadingHeight = 'h-[15px]';
            break;
        case 'md' : 
            fakeLoadingHeight = 'h-[25px]';
            break;
        case 'lg' : 
            fakeLoadingHeight = 'h-[200px]';
            break;
    }

    return(
        <div className={`w-full bg-slate-200 rounded shadow animate-pulse ${fakeLoadingHeight}`}>

        </div>
    );
}
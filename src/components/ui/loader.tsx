import {Spinner} from "@/components/ui/spinner";


export function Loader() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Spinner />

        </div>
    );
}

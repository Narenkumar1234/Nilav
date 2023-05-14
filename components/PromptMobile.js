export default function PromptMobile(){
    return (
    <div className="lg:block hidden">   
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div class="bg-white p-5 rounded-lg shadow-md max-w-md">
            <h2 class="text-lg font-medium mb-2">Please open this site on a mobile device</h2>
            <p class="text-gray-500 mb-4">For the best user experience, we recommend using this site on a mobile device.</p>
            <p class="text-gray-500">You can also use the "Inspect" feature in your browser to simulate a mobile device.</p>
        </div>
        </div>
    </div>
    )
}
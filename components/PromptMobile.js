export default function PromptMobile() {
  return (
    <div className="lg:block hidden">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="bg-white p-5 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-medium mb-2">
            Please open this site on a mobile device
          </h2>
          <p className="text-gray-500 mb-4">
            For the best user experience, we recommend using this site on a
            mobile device.
          </p>
          <p className="text-gray-500">
            You can also use the Inspect feature in your browser to simulate a
            mobile device.
          </p>
        </div>
      </div>
    </div>
  );
}

export const MobilePageModal= ({ operatingSystem }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
         <p>
          It looks like you're using a mobile device ({operatingSystem}). This page is only accessible on laptops or tablets.
        </p>
        <p className="mt-4 font-medium">Please switch to a desktop or tablet to continue.</p>
      </div>
    </div>
  );
}
import { Loader, Loader2 } from "lucide-react";

const VerifyingAuth = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="text-center">
        <Loader className="animate-spin size-14 text-black mx-auto mb-6" />
        <p className="text-gray-600 mb-2">Loading...</p>
      </div>
    </div>
  );
};

export default VerifyingAuth;

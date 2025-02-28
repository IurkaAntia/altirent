import { useState } from "react";

interface BookProps {
  tourId: string;
  tourPrice: number;
}

export default function Book({ tourId, tourPrice }: BookProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [peopleNum, setPeopleNum] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#f7fcfe] p-10 rounded-lg">
      <p className="text-xl">Book</p>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="border-none shadow-lg rounded-lg w-full h-12 px-5 outline-none focus:ring-0"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          required
          className="border-none shadow-lg rounded-lg w-full h-12 px-5 outline-none focus:ring-0"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          required
          className="border-none shadow-lg rounded-lg w-full h-12 px-5 outline-none focus:ring-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          required
          className="border-none shadow-lg rounded-lg w-full h-12 px-5 outline-none focus:ring-0"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount of people"
          required
          className="border-none shadow-lg rounded-lg w-full h-12 px-5 outline-none focus:ring-0"
          value={peopleNum}
          onChange={(e) => setPeopleNum(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="relative w-full min-h-12 px-6 bg-green-1000 font-semibold text-white overflow-hidden rounded-lg hover:bg-secondary transition-all duration-500"
        >
          {isProcessing ? "Processing..." : "BOOK NOW"}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <p
            className="fixed top-4 right-4 px-6 py-3 text-white text-lg bg-red-500 rounded-lg shadow-lg opacity-100 transition-all duration-300 transform translate-y-0 z-50"
            style={{
              animation: "slideIn 0.5s ease, fadeOut 0.5s 2.5s forwards",
            }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

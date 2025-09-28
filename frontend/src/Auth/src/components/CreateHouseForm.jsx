import { useState } from "react";
import { addHouse } from "../../../apiHelpers";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function CreateHouseForm({ onCreateHouse }) {
  const [houseName, setHouseName] = useState("");
  const [address, setAddress] = useState("");
  const [houseRules, setHouseRules] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleCreateHouse = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!houseName || !address) {
      setError("House name and address are required.");
      return;
    }
    setLoading(true);
    let avatarUrl = null;
    if (avatar) {
      avatarUrl = avatar.name;
    }
    if (onCreateHouse) {
      onCreateHouse({
        name: houseName,
        address,
        house_rules: houseRules,
        avatar: avatarUrl
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="houseName" className="text-sm text-gray-700 mb-2 block">
          House Name
        </Label>
        <Input
          id="houseName"
          type="text"
          placeholder="Enter house name"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
          className="bg-gray-50 border-0 rounded-lg h-12"
        />
      </div>

      <div>
        <Label htmlFor="address" className="text-sm text-gray-700 mb-2 block">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Enter house address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-50 border-0 rounded-lg h-12"
        />
      </div>

      <div>
        <Label htmlFor="houseRules" className="text-sm text-gray-700 mb-2 block">
          House Rules / Notes (Optional)
        </Label>
        <Textarea
          id="houseRules"
          placeholder="Enter house rules or notes"
          value={houseRules}
          onChange={(e) => setHouseRules(e.target.value)}
          className="bg-gray-50 border-0 rounded-lg min-h-24 resize-none"
        />
      </div>

      <div>
        <Label htmlFor="avatar" className="text-sm text-gray-700 mb-2 block">
          House Avatar / Icon (Optional)
        </Label>
        <div className="relative">
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label
            htmlFor="avatar"
            className="flex items-center justify-center w-full h-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <Upload className="w-5 h-5" />
              <span className="text-sm">
                {avatar ? avatar.name : "Choose file or drag and drop"}
              </span>
            </div>
          </label>
        </div>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <Button 
        onClick={handleCreateHouse}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 rounded-lg"
      >
        {loading ? "Creating..." : "Create House"}
      </Button>
    </div>
  );
}

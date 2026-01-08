import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState("");
  const [bookImg, setBookImg] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    setBookImg(file);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !author ||
      !subject ||
      !description ||
      !semester ||
      !category ||
      !condition ||
      !price ||
      !bookImg
    ) {
      setError("ERROR : ALL FIELDS ARE REQUIRED");
      console.log("ERROR : ALL FIELDS ARE REQUIRED");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("bookImg", bookImg);
   try{ const res = await axios.post(BASE_URL + "/book/addbook", formData, {
      withCredentials: true,
    });

    // console.log(res.data);
    toast.success("Book listed successfully");
   }catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message || "Error listing book");
   }

  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-accent font-bold text-center mb-8">
          List Your Book
        </h1>

        <div className="bg-black border border-gray-700 rounded-xl p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium mb-2">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Select Semester</option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
              <option value="fifth">Fifth</option>
              <option value="sixth">Sixth</option>
              <option value="seventh">Seventh</option>
              <option value="eighth">Eighth</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Select Category</option>
              <option value="book">Book</option>
              <option value="notes">Notes</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Select Condition</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">MRP</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500 transition-colors"
              min="0"
              required
            />
          </div>

          {/* Book Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Book Image</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="bookImg"
                required
              />
              <label
                htmlFor="bookImg"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white cursor-pointer hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>{bookImg ? bookImg.name : "Choose Image"}</span>
              </label>
            </div>
            {error && <p className="text-warning mt-2">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-info text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            List Book
          </button>
        </div>
      </div>
    </div>
  );
}

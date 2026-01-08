import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import Book from "./Book";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addBooks } from "../utils/bookSlice";
import { addNotes } from "../utils/notesSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Books = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books) || [];
  const notesData = useSelector((state) => state.notes) || [];

  const [semester, setSemester] = useState("");
  const [notes, setNotes] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  };

  const handleFilter = () => {
    setPage(1);
    if (notes === "notes") getNotes(1);
    else getBooks(1);
  };

  const getBooks = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (semester) query.append("semester", semester);
      query.append("page", pageNumber);
      query.append("limit", 9);

      const res = await axios.get(
        BASE_URL + "/book/getbook?" + query.toString(),
        {
          withCredentials: true,
        }
      );

      const replace = pageNumber === 1;
      dispatch(addBooks({ data: res?.data?.data, replace }));
      setPage(res?.data?.pagination?.page || pageNumber);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const getNotes = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (semester) query.append("semester", semester);
      query.append("page", pageNumber);
      query.append("limit", 9);

      const res = await axios.get(
        BASE_URL + "/book/getnotes?" + query.toString(),
        {
          withCredentials: true,
        }
      );

      const replace = pageNumber === 1;
      dispatch(addNotes({ data: res?.data?.data, replace }));
      setPage(res?.data?.pagination?.page || 1);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      if (notes === "notes") getNotes(page - 1);
      else getBooks(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      if (notes === "notes") getNotes(page + 1);
      else getBooks(page + 1);
    }
  };

  useEffect(() => {
    // Initial fetch
    getBooks();
    getNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 px-4 md:px-0">
        {/* Filters */}
        <div className="relative w-full max-w-3xl">
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-30 bg-gradient-to-br from-slate-900/60 to-slate-800/60"></div>
          <div className="relative flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700/50">
            {/* Semester */}
            <div className="relative group w-full sm:w-auto">
              <label className="block text-xs font-medium text-slate-300 mb-2 tracking-wide uppercase">
                Semester
              </label>
              <div className="relative">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="appearance-none px-5 py-3.5 pr-12 border-2 border-slate-600/50 rounded-xl text-sm bg-slate-800/80 text-slate-100 cursor-pointer transition-all duration-300 w-full sm:min-w-[160px] hover:border-blue-400/60 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 focus:bg-slate-800 group-hover:shadow-lg group-hover:shadow-blue-500/10"
                >
                  <option value="">All Semesters</option>
                  <option value="first">Semester 1</option>
                  <option value="second">Semester 2</option>
                  <option value="third">Semester 3</option>
                  <option value="fourth">Semester 4</option>
                  <option value="fifth">Semester 5</option>
                  <option value="sixth">Semester 6</option>
                  <option value="seventh">Semester 7</option>
                  <option value="eighth">Semester 8</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Type */}
            <div className="relative group w-full sm:w-auto">
              <label className="block text-xs font-medium text-slate-300 mb-2 tracking-wide uppercase">
                Content Type
              </label>
              <div className="relative">
                <select
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="appearance-none px-5 py-3.5 pr-12 border-2 border-slate-600/50 rounded-xl text-sm bg-slate-800/80 text-slate-100 cursor-pointer transition-all duration-300 w-full sm:min-w-[140px] hover:border-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 focus:bg-slate-800 group-hover:shadow-lg group-hover:shadow-purple-500/10"
                >
                  <option value="">Books</option>
                  <option value="notes">Notes</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="relative group mt-4 sm:mt-0">
              <button
                onClick={handleFilter}
                className="relative px-8 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl text-sm cursor-pointer transition-all duration-300 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/25 active:transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center gap-2">
                  Apply Filters
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Particles */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Books / Notes Grid */}
        <AnimatePresence mode="wait">
          {notes === "notes" ? (
            <motion.div
              key="notes"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
              transition={fadeInUp.transition}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
            >
              {notesData?.map((note, index) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Book book={note} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="books"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
              transition={fadeInUp.transition}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
            >
              {books?.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Book book={book} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page <= 1}
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="flex items-center gap-1">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6 z-10 relative">
        <button
          disabled={page <= 1}
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="flex items-center gap-1">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Books;

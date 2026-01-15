import React, { useEffect } from "react";
import { FaClock, FaStar, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getHomeArticles } from "../redux/slices/userSlice";

export default function DashboardArticles() {
  const dispatch = useDispatch();
  const { loading, error, homeArticles } = useSelector((state) => state.user);

  useEffect(() => {
    const loadHomeArticles = async () => {
      try {
        await dispatch(getHomeArticles()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    loadHomeArticles();
  }, [dispatch]);
console.log(homeArticles)
  return (
    <div className="p-6 border shadow rounded-xl bg-card text-card-foreground">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Latest Articles</h3>
      <div className="space-y-4">
        {
          homeArticles.map((item, index) => {
            const coverImgUrl = item?.coverImageUrl||"";
            console.log(coverImgUrl);
            const completeUrl = coverImgUrl.startsWith("http")
              ? coverImgUrl
              : `http://localhost:8080${coverImgUrl}`;
            console.log(completeUrl);
            const contentPeek = item.bodyMarkdown
  .replace(/#{1,6}\s?/g, '')        
  .replace(/\*\*/g, '')             
  .replace(/\*/g, '')               
  .replace(/_{1,2}/g, '')           
  .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') 
  .replace(/`{1,3}/g, '')           
  .replace(/^>\s?/gm, '')           
  .replace(/^-\s?/gm, '')           
  .replace(/^\*\s?/gm, '')          
  .replace(/^\d+\.\s?/gm, '')       
  .replace(/\n+/g, ' ')             
  .replace(/\s+/g, ' ')             
  .trim()                           
  .slice(0, 100)
            
           return (<div className="flex items-start p-4 space-x-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <img
                src={ coverImgUrl.startsWith("http")?coverImgUrl:`http://localhost:8080${coverImgUrl}`}
                alt="Article thumbnail"
                className="object-cover w-20 h-16 rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {item?.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {`${contentPeek}...`}
                </p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <span className="flex flex-row items-center">
                    <FaUser className="mr-1" />
                    {item?.author}
                  </span>
                  <span className="flex flex-row items-center">
                    <FaClock className="mr-1" />5 min read
                  </span>
                  <span className="flex flex-row items-center">
                    <FaStar className="mr-1" />
                    +50 XP
                  </span>
                </div>
              </div>
            </div>);
          })
        }
        
        
      </div>
    </div>
  );
}

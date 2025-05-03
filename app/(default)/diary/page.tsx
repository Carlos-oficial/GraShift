import Link from "next/link";
import FitcheckCard from "../../components/FitcheckCard";

const fitcheckData = [
  { imageUrl: "/uploads/fit4.jpg", title: "Casual", time: "16:30", date: "2024-04-02" },
  { imageUrl: "/uploads/fit3.jpg", title: "Casual", time: "10:00", date: "2023-04-02" },
  { imageUrl: "/uploads/fit2.jpg", title: "Casual", time: "14:00", date: "2023-09-06" },
  { imageUrl: "/uploads/fit1.jpg", title: "Casual", time: "12:30", date: "2023-04-01" },
  { imageUrl: "/uploads/fit8.jpg", title: "Casual", time: "12:30", date: "2023-04-01" },

];

export default function Diary() {
  // Group fitcheck data by date
  const groupedData = fitcheckData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof fitcheckData>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="flex flex-col items-center">
      {sortedDates.map((date) => (
        <div key={date} className="text-center mb-8">
          <h2 className="text-2xl mb-4">
            {new Date(date).toDateString() === new Date().toDateString()
              ? "Today"
              : new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </h2>
          <div className="flex flex-col items-center">
            {groupedData[date].map((item, index) => (
              <Link key={index} href={`/diary/fitcheck/`} passHref>
                <div className="w-full">
                  <FitcheckCard
                    imageUrl={item.imageUrl}
                    title={item.title}
                    time={item.time}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
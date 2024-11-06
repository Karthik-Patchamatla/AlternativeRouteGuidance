export default function HomepageContent() {
  return (
    <div className="flex-1 ml-64 pt-20 p-6">
      <div className="flex space-x-10 text-[#3366cc] text-lg">
        <div className="cursor-pointer h-28 w-full shadow-md rounded-lg flex items-center justify-around">
            <div>
                <i className="fa-solid fa-train"></i>
            </div>

            <div>
                <p>Booked Trains</p>
            </div>
        </div>

        <div className="cursor-pointer h-28 w-full shadow-md rounded-lg flex items-center justify-around">
            <div>
                <i className="fa-solid fa-ban"></i>
            </div>
            <div>
                <p>Cancel Booking</p>
            </div>
        </div>

        <div className="cursor-pointer h-28 w-full shadow-md rounded-lg flex items-center justify-around">
            <div>
                <i className="fa-solid fa-ticket"></i>
            </div>
            <div>
                <p>Tickets</p>
            </div>
        </div>
      </div>
    </div>
  );
}

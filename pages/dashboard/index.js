import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";
import Layout from "../../components/Layout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BackTop from "../../components/BacktoTop/BacktoTop";
import { Circle } from "rc-progress";
import CountUp from "react-countup";

const Dashboard = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/"); //redirect to login page if the user is not authenticated
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); //redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="m-4 gap-4 text-black">
          <div className="m-4 grid gap-4 sm:grid-cols-4">
            <div className="bg-sky-50 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110">
              <div className="flex justify-between ml-7 mt-4">
                <PeopleAltIcon fontSize="large" />
                <div className="mr-5 mt-2 roundprogress">
                  <Circle
                    percent={77}
                    strokeWidth={10}
                    trailWidth={8}
                    strokeColor="rgb(135, 206, 235)"
                    trailColor="#b3a4f3"
                  />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-600 font-semibold">Total Users</div>
                <div className="text-3xl font-semibold">
                  {" "}
                  <CountUp start={0} end={200} delay={1} />
                </div>
              </div>
            </div>

            <div className="bg-sky-50 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110">
              <div className="flex justify-between ml-7 mt-4">
                <PeopleAltIcon fontSize="large" />
                <div className="mr-5 mt-2 roundprogress">
                  <Circle
                    percent={77}
                    strokeWidth={10}
                    trailWidth={8}
                    strokeColor="rgb(135, 206, 235)"
                    trailColor="#b3a4f3"
                  />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-600 font-semibold">Total Users</div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={120} delay={2} />
                </div>
              </div>
            </div>
            <div className="bg-sky-50 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110">
              <div className="flex justify-between ml-7 mt-4">
                <PeopleAltIcon fontSize="large" />
                <div className="mr-5 mt-2 roundprogress">
                  <Circle
                    percent={77}
                    strokeWidth={10}
                    trailWidth={8}
                    strokeColor="rgb(135, 206, 235)"
                    trailColor="#b3a4f3"
                  />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-600 font-semibold">Total Users</div>
                <div className="text-3xl font-semibold">
                  {" "}
                  <CountUp start={0} end={35} delay={3} />
                </div>
              </div>
            </div>
            <div className="bg-sky-50 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110">
              <div className="flex justify-between ml-7 mt-4">
                <PeopleAltIcon fontSize="large" />
                <div className="mr-5 mt-2 roundprogress">
                  <Circle
                    percent={77}
                    strokeWidth={10}
                    trailWidth={8}
                    strokeColor="rgb(135, 206, 235)"
                    trailColor="#b3a4f3"
                  />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-600 font-semibold">Total Users</div>
                <div className="text-3xl font-semibold">
                  {" "}
                  <CountUp start={0} end={400} delay={4} />
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Out
            </button>
            {/* Add similar divs with className instead of class */}
          </div>
        </div>

        <BackTop />
      </Layout>
    </>
  );
};

export default Dashboard;

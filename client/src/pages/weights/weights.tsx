import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chart from "../home/chart";
import "./weights.scss";
import baseURL from "../../../links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"


const socket = io(baseURL);

function extractNumberFromString(inputString: string): string {
  const numberMatch = inputString.match(/[-+]?(\d*[.])?\d+/);
  if (numberMatch) {
    const extractedNumber = numberMatch[0];
    return extractedNumber.toString();
  } else {
    return "";
  }
}

const Weights = () => {
  const [entry, setEntry] = useState("");
  const [weights, setWeights] = useState(Array());
  const getWeights = async () => {
    try {
      const response = await axios.get(baseURL + "/weights", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      const newData = data.sort((a: any, b: any) => {
        const dateA = parseInt(a.datadate);
        const dateB = parseInt(b.datadate);
        return dateA - dateB;
      });
      setWeights(newData);
    } catch (error) {
      console.log(error);
    }
    return weights;
  };

  useEffect(() => {
    getWeights();
  }, []);

  useEffect(() => {
    socket.on("updateWeight", (_data: any) => {
      getWeights();
    });
  }, [socket]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const datadate: Date = new Date();
    const formattedDate = format(datadate, "yyyyMMdd");
    try {
      const response = await axios.post(
        `${baseURL}/weights/new`,
        {
          entry: entry,
          datadate: formattedDate,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        socket.emit("addWeight", {});
        console.log("event emitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="weights-container">
      <div className="weight-title-container">
        <h2 className="weights-title">Weights</h2>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl mb-4 font-bold">Add Weight Entry</DialogTitle>
              <DialogDescription>

              </DialogDescription>
            </DialogHeader>
              <input
                className="rounded mb-4 w-64 lg:w-96 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                type="string"
                name="entry"
                placeholder="Weight"
                onChange={(e) => setEntry(extractNumberFromString(e.target.value))}
                required
              />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <button className="bg-black text-white px-4 py-2 rounded no-underline disabled:bg-gray-400" disabled={!entry} onClick={handleSubmit}>Submit</button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Chart data={weights} />
    </div>
  );
};

export default Weights;

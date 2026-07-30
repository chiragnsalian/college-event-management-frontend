import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import axios from "axios";
import OrganizerLayout from "../components/OrganizerLayout";

const QRScanner = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [scanned, setScanned] = useState(false);

  const handleScan = async (result) => {
    if (!result || scanned) return;

    try {
      setScanned(true);

      const registrationId = result?.text;

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/attendance/scan",
        {
          registrationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate(`/organizer/attendance/${eventId}`);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Invalid QR Code"
      );

      setScanned(false);
    }
  };

  return (
    <OrganizerLayout>

      <h1 className="text-4xl font-bold mb-8">
        QR Attendance Scanner
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <QrReader
          constraints={{
            facingMode: "environment",
          }}
          onResult={(result) => {
            if (result) {
              handleScan(result);
            }
          }}
          style={{
            width: "100%",
          }}
        />

      </div>

      <button
        onClick={() =>
          navigate(`/organizer/attendance/${eventId}`)
        }
        className="mt-8 bg-gray-700 text-white px-6 py-3 rounded-lg"
      >
        ← Back
      </button>

    </OrganizerLayout>
  );
};

export default QRScanner;
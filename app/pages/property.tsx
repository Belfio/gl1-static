import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { PropertyFeatures } from "~/@/components/PropertyFeatures";
import { RetrofitLoanProposals } from "~/@/components/RetrofitLoanProposals";
import { Property } from "~/@/lib/types";

export default function PropertyPage({
  property,
}: {
  property: Property | undefined;
}) {
  console.log(property);
  const navigate = useNavigate();
  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <div className="font-sans p-8 pt-4 max-w-[1280px] ">
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mb-4 text-[var(--darkblue)] hover:text-black"
        >
          <ArrowLeft />
        </button>
      </div>
      <h1 className="text-2xl mb-4">Property information</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12"> */}
      <div className="border border-[--darkblue] py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-0">
          <div className="flex flex-col  gap-1 p-4 border-r-2 ">
            <h2 className="text-xl mb-2">Address</h2>
            <p className="capitalize ">
              {property?.propertyAttributes.address.toLowerCase().split(",")[0]}
            </p>
            <p>{property?.propertyAttributes.postcode}</p>
            <p>{property?.propertyAttributes.local_authority_area}</p>
          </div>
          <div className="flex flex-col  gap-1 p-4 ">
            <h2 className="text-xl mb-2">Property Type</h2>
            <p>{property?.propertyAttributes.built_form}</p>
            <p>
              Age category:{" "}
              {property?.propertyAttributes.construction_age_category}
            </p>
            <p className="">
              Number of rooms:{" "}
              {property?.propertyAttributes.number_of_habitable_rooms ||
                property?.propertyAttributes["number of habitable rooms"]}
            </p>
            {property?.landRegistryData[0] && (
              <>
                <p className="">
                  Purchase price:{" "}
                  {property?.landRegistryData[0].price_paid.toLocaleString(
                    "en-GB",
                    {
                      style: "currency",
                      currency: "GBP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>
                <p className="">
                  Transfer date:{" "}
                  {new Date(
                    property?.landRegistryData[0].date_of_transfer
                  ).toLocaleDateString("en-GB")}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-12 mb-4">Energy efficiency profile</h2>
      <div className="border border-[--darkblue] py-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col  gap-1 p-4 border-r-2 ">
            <h3 className="text-lg  mb-2">Current</h3>
            <p>
              EPC:{" "}
              <span
                className={`px-2 py-1 rounded ${
                  ["A", "B", "C"].includes(
                    property?.propertyAttributes.current_epc_band ||
                      property?.predictedEfficiency.predicted_epc_band ||
                      ""
                  )
                    ? "bg-[var(--blue)]"
                    : "bg-[var(--taupe)] "
                }`}
              >
                {property?.propertyAttributes.current_epc_band ||
                  property?.predictedEfficiency.predicted_epc_band +
                    "predicted"}{" "}
              </span>
            </p>
            <p>
              EER: {Math.round(property?.predictedEfficiency.predicted_eer)}
            </p>
            {/* <p>
            Virtual Energy Rating:{" "}
            <span className={`px-2 py-1 rounded `}>
              {property?.predictedEfficiency.predicted_eer} (
              {property?.predictedEfficiency.predicted_eer} EER)
            </span>
          </p> */}
            <p>
              Carbon emissions:{" "}
              {property?.propertyAttributes.current_co2_emissions} tn of CO₂
            </p>
          </div>
          <div className="flex flex-col  gap-1 p-4 ">
            <h3 className="text-lg  mb-2">Potential</h3>
            <p>
              EPC:{" "}
              <span
                className={`px-2 py-1 rounded ${
                  ["A", "B", "C"].includes(
                    property?.propertyAttributes.potential_epc_band || ""
                  )
                    ? "bg-[var(--blue)]"
                    : "bg-[var(--taupe)] "
                }`}
              >
                {property?.propertyAttributes.potential_epc_band}
              </span>
            </p>
            <p>
              EER: {Math.round(property?.predictedEfficiency.predicted_eer)}
            </p>
            <p>
              Carbon emissions:{" "}
              {property?.propertyAttributes.potential_co2_emissions} tn of CO₂ (
              -
              {(
                ((property?.propertyAttributes.current_co2_emissions -
                  property?.propertyAttributes.potential_co2_emissions) /
                  property?.propertyAttributes.current_co2_emissions) *
                100
              ).toFixed(2)}
              %)
            </p>
          </div>
        </div>
      </div>
      {property?.valueDetails && (
        <>
          <h2 className="text-2xl mt-12 mb-4">Mortgage Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
            <div className="flex flex-col  gap-1 p-4 border-r-2 ">
              <p className="">
                £{property?.valueDetails?.loanOutstanding || "N/A"} outstanding
                balance
              </p>
              <p className="">
                £{property?.valueDetails?.loanOutstanding || "N/A"} monthly
                payment
              </p>
              {/* <p>{property?.valueDetails.ltv}% LTV</p> */}
            </div>
            <div className="flex flex-col  gap-1 p-4 border-r-2 ">
              <p>APR: {property?.valueDetails.apr}%</p>
              <p>End of loan: {property?.valueDetails.endOfLoan}</p>

              <p>Time left: {property?.valueDetails.timeLeft}</p>

              <p>LTV:{property?.valueDetails.ltv}% </p>
            </div>
          </div>
        </>
      )}

      <div className="mt-8 pb-12">
        <PropertyFeatures property={property} />
        <RetrofitLoanProposals property={property} />
      </div>
    </div>
  );
}

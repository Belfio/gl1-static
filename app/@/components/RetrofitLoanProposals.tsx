import { Property } from "../lib/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";

interface LoanOption {
  id: number;
  loanAmount: number;
  apr: number;
  cashback: number;
  retrofitItems: string[];
  monthlyPayment: number;
  duration: string;
  customerSavings: number;
  customerValueUplift: number;
  bankPredictedEPC: string;
  bankFutureLTV: number;
  bankCarbonReduction: number;
}

const loanOptions: LoanOption[] = [
  {
    id: 1,
    loanAmount: 1400,
    apr: 15.3,
    cashback: 0,
    retrofitItems: [
      "Roof insulation: 270mm loft insulation",
      "Wall insulation: Filled cavity",
    ],
    monthlyPayment: 24.97,
    duration: "8y 3m",
    customerSavings: 82,
    customerValueUplift: 3140,
    bankPredictedEPC: "C",
    bankFutureLTV: 54,
    bankCarbonReduction: 0.4,
  },
  {
    id: 2,
    loanAmount: 16955,
    apr: 7.0,
    cashback: 0,
    retrofitItems: [
      "Roof insulation: 270mm loft insulation",
      "Wall insulation: Filled cavity",
      "Energy efficiency rating of main heating: Very Good",
      "Floor insulation: Insulated",
      "Heat recovery waste water system: Waste water heat recovery",
      "Area with thermostat control: More than 1 room thermostat",
      "Solar panels: 50%",
    ],
    monthlyPayment: 225.93,
    duration: "8y 3m",
    customerSavings: 257,
    customerValueUplift: 27940,
    bankPredictedEPC: "B",
    bankFutureLTV: 54,
    bankCarbonReduction: 1.3,
  },
  {
    id: 3,
    loanAmount: 400,
    apr: 7.0,
    cashback: 0,
    retrofitItems: ["Roof insulation: 270mm loft insulation"],
    monthlyPayment: 5.33,
    duration: "8y 3m",
    customerSavings: 65,
    customerValueUplift: 740,
    bankPredictedEPC: "C",
    bankFutureLTV: 54,
    bankCarbonReduction: 0.3,
  },
];

export function RetrofitLoanProposals({ property }: { property: Property }) {
  return (
    <div className="">
      <h2 className="text-2xl mb-6">Loan options</h2>
      <div className="grid grid-cols-3 gap-4 xl:hidden">
        {loanOptions.map((option) => (
          <Card
            key={option.id}
            className=" hover:bg-slate-100 border-[--darkblue]"
          >
            <CardHeader>
              <CardTitle className="text-lg">Option {option.id}</CardTitle>
              <div className="text-sm">
                <p>Loan amount: £{option.loanAmount.toLocaleString()}</p>
                <div className="flex items-center justify-between">
                  <p>APR: {option.apr}%</p>
                  <Slider
                    defaultValue={[option.apr]}
                    max={20}
                    step={0.1}
                    className="w-[100px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Cashback: £{option.cashback}</p>
                  <Slider
                    defaultValue={[option.cashback]}
                    max={1000}
                    step={10}
                    className="w-[100px] "
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="">
                <div className="bg-transparent h-[280px] border-none shadow-none">
                  <h3 className="text-base">Retrofit items</h3>

                  <div className="text-sm">
                    <ul className="list-disc list-inside">
                      {option.retrofitItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-transparent h-[160px] border-none shadow-none">
                  <h3 className="text-base">Loan details</h3>

                  <p>Monthly payment: £{option.monthlyPayment}</p>
                  <p>Cashback: £{option.cashback}</p>
                  <p>Duration: {option.duration}</p>
                  <p className="text-xs text-gray-500">(same as mortgage)</p>
                </div>

                <div className="bg-transparent h-[280px] border-none shadow-none overflow-hidden scroll-auto">
                  <h3 className="text-base">Loan impact</h3>
                  <div className="text-sm">
                    <h4 className="">Customer</h4>
                    <p>
                      Predicted energy savings: £{option.customerSavings} per
                      year 🟠
                    </p>
                    <p>
                      Predicted value uplift: £{option.customerValueUplift} 🟠
                    </p>
                    <h4 className=" mt-2">Bank</h4>
                    <p>
                      Predicted EPC: {option.bankPredictedEPC} →{" "}
                      {option.bankPredictedEPC}
                    </p>
                    <p>Predicted future LTV: {option.bankFutureLTV}% 🟠</p>
                    <p>
                      Carbon emissions reduction: {option.bankCarbonReduction}{" "}
                      tn CO₂e/year 🟠
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>APPLY</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex-row hidden xl:flex">
        <Card className="border-transparent text-right w-[260px] p-0 mr-2">
          <CardHeader className="px-0">
            <div className="text-sm pt-8 text-right">
              <p>Loan amount:</p>
              <div className="text-right">
                <p>APR:</p>
              </div>
              <div className="">
                <p>Cashback:</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="">
              <div className="bg-transparent h-[280px] border-none shadow-none">
                <h3 className="text-base">Retrofit items</h3>
              </div>
              <div className="bg-transparent h-[160px] border-none shadow-none">
                <h3 className="text-base">Loan details</h3>

                <p>Monthly payment:</p>
                <p>Cashback:</p>
                <p>Duration:</p>
              </div>

              <div className="bg-transparent h-[220px] border-none shadow-none overflow-hidden scroll-auto">
                <h3 className="text-base">Loan impact</h3>
                <div className="text-sm">
                  <h4 className="">Customer</h4>
                  <p>Predicted energy savings:</p>
                  <p>Predicted value uplift:</p>
                  <h4 className=" mt-2">Bank</h4>
                  <p>Predicted EPC:</p>
                  <p>Predicted future LTV:</p>
                  <p>CO₂ emissions reduction:</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-4">
          {loanOptions.map((option) => (
            <Card
              key={option.id}
              className=" hover:bg-slate-100 border-[--darkblue]"
            >
              <CardHeader>
                <CardTitle className="text-lg">Option {option.id}</CardTitle>
                <div className="text-sm">
                  <p>{option.loanAmount.toLocaleString()}</p>
                  <div className="flex items-center justify-between">
                    <p>{option.apr}%</p>
                    <Slider
                      defaultValue={[option.apr]}
                      max={20}
                      step={0.1}
                      className="w-[100px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p>£{option.cashback}</p>
                    <Slider
                      defaultValue={[option.cashback]}
                      max={1000}
                      step={10}
                      className="w-[100px] "
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="">
                  <div className="bg-transparent h-[280px] border-none shadow-none">
                    <div className="text-sm">
                      <ul className="list-disc list-inside">
                        {option.retrofitItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-transparent h-[160px] border-none shadow-none mt-6">
                    <p>£{option.monthlyPayment}</p>
                    <p>£{option.cashback}</p>
                    <p>
                      {option.duration}{" "}
                      <span className="text-xs text-gray-500">
                        (same as mortgage)
                      </span>
                    </p>
                  </div>

                  <div className="bg-transparent h-[160px] border-none shadow-none overflow-hidden scroll-auto">
                    <div className="text-sm mt-5">
                      <p>£{option.customerSavings} per year 🟠</p>
                      <p>
                        Predicted value uplift: £{option.customerValueUplift} 🟠
                      </p>

                      <p className="mt-6 pt-[2px]">
                        {option.bankPredictedEPC} → {option.bankPredictedEPC}
                      </p>
                      <p>{option.bankFutureLTV}% 🟠</p>
                      <p>{option.bankCarbonReduction} tn CO₂e/year 🟠</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

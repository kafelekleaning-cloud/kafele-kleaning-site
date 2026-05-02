"use client";

import { useMemo, useState } from "react";

type CleaningType = "turnover" | "deep" | "move" | "airbnb";
type UrgencyType = "normal" | "rush" | "sameDay";

export default function QuoteBuilderPage() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [sqft, setSqft] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [cleaningType, setCleaningType] = useState<CleaningType>("turnover");
  const [urgency, setUrgency] = useState<UrgencyType>("normal");

  const [travelMode, setTravelMode] = useState("custom");

  const [discount, setDiscount] = useState("");
  const [markup, setMarkup] = useState("");

  const [laborCost, setLaborCost] = useState("");

  const [fridge, setFridge] = useState(false);
  const [oven, setOven] = useState(false);
  const [windows, setWindows] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [heavyCondition, setHeavyCondition] = useState(false);

  const [savedQuotes, setSavedQuotes] = useState<
    Array<{
      id: number;
      clientName: string;
      clientPhone: string;
      summary: string;
      clientText: string;
      baseQuote: number;
      recommendedQuote: number;
      profit: number;
      margin: number;
      savedAt: string;
    }>
  >([]);

  const results = useMemo(() => {
    const sqftNum = Number(sqft) || 0;
    const bedsNum = Number(beds) || 0;
    const bathsNum = Number(baths) || 0;
    const laborCostNum = Number(laborCost) || 0;
    const discountNum = Number(discount) || 0;
    const markupNum = Number(markup) || 0;

    let baseFromSqft = 275;

    if (sqftNum < 1000) {
      baseFromSqft = 275;
    } else if (sqftNum < 2000) {
      baseFromSqft = sqftNum * 0.16;
    } else if (sqftNum < 3000) {
      baseFromSqft = sqftNum * 0.15;
    } else if (sqftNum < 5000) {
      baseFromSqft = sqftNum * 0.14;
    } else {
      baseFromSqft = sqftNum * 0.13;
    }

    const cleaningTypeMultiplier =
      cleaningType === "turnover"
        ? 1
        : cleaningType === "deep"
          ? 1.25
          : cleaningType === "move"
            ? 1.2
            : 1.1;

    const urgencyFee =
      urgency === "normal" ? 0 : urgency === "rush" ? 40 : 75;

    let extrasTotal = 0;
    if (fridge) extrasTotal += 25;
    if (oven) extrasTotal += 25;
    if (windows) extrasTotal += 40;
    if (laundry) extrasTotal += 30;
    if (heavyCondition) extrasTotal += 50;

    const travelPresetFee =
      travelMode === "local"
        ? 0
        : travelMode === "zone1"
          ? 20
          : travelMode === "zone2"
            ? 35
            : travelMode === "zone3"
              ? 50
              : 0;

    const typeAdjusted = baseFromSqft * cleaningTypeMultiplier;
    const adjustedForNegotiation =
      typeAdjusted + urgencyFee + extrasTotal + travelPresetFee + markupNum - discountNum;

    const finalPrice = Math.max(275, adjustedForNegotiation);
    const recommendedQuote = finalPrice * 1.08;
    const cleanerPaySuggested = Math.round(finalPrice * 0.42);

    const estimatedHoursBase =
      sqftNum <= 0
        ? 0
        : sqftNum < 1000
          ? 2
          : sqftNum < 2000
            ? 3
            : sqftNum < 3000
              ? 4
              : sqftNum < 5000
                ? 5.5
                : 7;

    const typeHoursAdjustment =
      cleaningType === "deep" ? 1 :
      cleaningType === "move" ? 0.75 :
      cleaningType === "airbnb" ? 0.5 :
      0;

    const extrasHours =
      (fridge ? 0.3 : 0) +
      (oven ? 0.3 : 0) +
      (windows ? 0.5 : 0) +
      (laundry ? 0.4 : 0) +
      (heavyCondition ? 0.75 : 0);

    const hoursEstimate =
      estimatedHoursBase + typeHoursAdjustment + extrasHours;

    const profit = finalPrice - laborCostNum;
    const recommendedProfit = recommendedQuote - laborCostNum;
    const margin = finalPrice > 0 ? (profit / finalPrice) * 100 : 0;

    const cleaningTypeLabel =
      cleaningType === "turnover"
        ? "Turnover / Standard Clean"
        : cleaningType === "deep"
          ? "Deep Clean"
          : cleaningType === "move"
            ? "Move In / Move Out"
            : "Airbnb Reset";

    const urgencyLabel =
      urgency === "normal"
        ? "Normal Timing"
        : urgency === "rush"
          ? "Rush"
          : "Same Day";

    const travelLabel =
      travelMode === "local"
        ? "Local"
        : travelMode === "zone1"
          ? "Zone 1"
          : travelMode === "zone2"
            ? "Zone 2"
            : travelMode === "zone3"
              ? "Zone 3"
              : "Custom";

    const extrasList = [
      fridge ? "fridge" : null,
      oven ? "oven" : null,
      windows ? "interior windows" : null,
      laundry ? "laundry / linen reset" : null,
      heavyCondition ? "heavy condition" : null,
    ].filter(Boolean);

    const profitWarning =
      margin < 20
        ? "Low margin warning"
        : margin < 30
          ? "Watch margin"
          : "Healthy margin";

    const profitWarningColor =
      margin < 20
        ? "text-red-400"
        : margin < 30
          ? "text-yellow-400"
          : "text-green-400";

    const summary = `Quote Summary:
Client: ${clientName || "-"}
Phone: ${clientPhone || "-"}

${cleaningTypeLabel}
${sqftNum || "-"} sq ft | ${bedsNum || "-"} bed / ${bathsNum || "-"} bath
Timing: ${urgencyLabel}
Travel Zone: ${travelLabel}
Extras: ${extrasList.length ? extrasList.join(", ") : "none"}

Base from Sq Ft: $${baseFromSqft.toFixed(2)}
Urgency Fee: $${urgencyFee.toFixed(2)}
Extras Total: $${extrasTotal.toFixed(2)}
Travel Fee: $${travelPresetFee.toFixed(2)}
Markup: $${markupNum.toFixed(2)}
Discount: $${discountNum.toFixed(2)}

Base Quote: $${finalPrice.toFixed(2)}
Recommended Quote: $${recommendedQuote.toFixed(2)}
Labor Cost: $${laborCostNum.toFixed(2)}
Suggested Cleaner Pay: $${cleanerPaySuggested.toFixed(2)}
Estimated Profit: $${profit.toFixed(2)}
Recommended Profit: $${recommendedProfit.toFixed(2)}
Margin: ${margin.toFixed(1)}%
Estimated Hours: ${hoursEstimate.toFixed(1)}
Profit Status: ${profitWarning}`;

    const clientFacingQuote = `I know your first thought is probably that this is going to cost more than it's worth.
$${finalPrice.toFixed(2)} to $${recommendedQuote.toFixed(2)}.
How does that land with you?`;

    return {
      sqftNum,
      bedsNum,
      bathsNum,
      laborCostNum,
      baseFromSqft,
      extrasTotal,
      urgencyFee,
      travelPresetFee,
      finalPrice,
      recommendedQuote,
      profit,
      recommendedProfit,
      margin,
      cleanerPaySuggested,
      hoursEstimate,
      summary,
      clientFacingQuote,
      profitWarning,
      profitWarningColor,
    };
  }, [
    sqft,
    beds,
    baths,
    cleaningType,
    urgency,
    travelMode,
    discount,
    markup,
    laborCost,
    fridge,
    oven,
    windows,
    laundry,
    heavyCondition,
    clientName,
    clientPhone,
  ]);

  const resetForm = () => {
    setClientName("");
    setClientPhone("");
    setSqft("");
    setBeds("");
    setBaths("");
    setCleaningType("turnover");
    setUrgency("normal");
    setTravelMode("custom");
    setDiscount("");
    setMarkup("");
    setLaborCost("");
    setFridge(false);
    setOven(false);
    setWindows(false);
    setLaundry(false);
    setHeavyCondition(false);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(results.summary);
      alert("Quote summary copied.");
    } catch {
      alert("Could not copy summary.");
    }
  };

  const copyClientQuote = async () => {
    try {
      await navigator.clipboard.writeText(results.clientFacingQuote);
      alert("Client-facing quote copied.");
    } catch {
      alert("Could not copy client-facing quote.");
    }
  };

  const saveQuote = () => {
    const newQuote = {
      id: Date.now(),
      clientName,
      clientPhone,
      summary: results.summary,
      clientText: results.clientFacingQuote,
      baseQuote: results.finalPrice,
      recommendedQuote: results.recommendedQuote,
      profit: results.profit,
      margin: results.margin,
      savedAt: new Date().toLocaleString(),
    };

    setSavedQuotes((prev) => [newQuote, ...prev]);
    alert("Quote saved in this session.");
  };

  const loadSavedQuoteText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Saved quote copied.");
    } catch {
      alert("Could not copy saved quote.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Quote Builder</h1>
        <p className="text-zinc-400 mb-8">
          Fast pricing tool for turnovers, deep cleans, move in / move out jobs, and Airbnb resets.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-zinc-900 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Client + Job Inputs</h2>

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Client name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Client phone"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Square footage"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full p-3 rounded bg-white text-black"
                placeholder="Beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              />
              <input
                className="w-full p-3 rounded bg-white text-black"
                placeholder="Baths"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
              />
            </div>

            <select
              className="w-full p-3 rounded bg-white text-black"
              value={cleaningType}
              onChange={(e) => setCleaningType(e.target.value as CleaningType)}
            >
              <option value="turnover">Turnover / Standard Clean</option>
              <option value="deep">Deep Clean</option>
              <option value="move">Move In / Move Out</option>
              <option value="airbnb">Airbnb Reset</option>
            </select>

            <select
              className="w-full p-3 rounded bg-white text-black"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as UrgencyType)}
            >
              <option value="normal">Normal Timing</option>
              <option value="rush">Rush</option>
              <option value="sameDay">Same Day</option>
            </select>

            <select
              className="w-full p-3 rounded bg-white text-black"
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value)}
            >
              <option value="custom">Custom Travel Fee</option>
              <option value="local">Local ($0)</option>
              <option value="zone1">Zone 1 ($20)</option>
              <option value="zone2">Zone 2 ($35)</option>
              <option value="zone3">Zone 3 ($50)</option>
            </select>

            <div className="bg-zinc-800 rounded-xl p-4">
              <p className="font-semibold mb-3">Extras</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={fridge}
                    onChange={() => setFridge(!fridge)}
                  />
                  <span>Fridge Inside (+$25)</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={oven}
                    onChange={() => setOven(!oven)}
                  />
                  <span>Oven Inside (+$25)</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={windows}
                    onChange={() => setWindows(!windows)}
                  />
                  <span>Interior Windows (+$40)</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={laundry}
                    onChange={() => setLaundry(!laundry)}
                  />
                  <span>Laundry / Linen Reset (+$30)</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={heavyCondition}
                    onChange={() => setHeavyCondition(!heavyCondition)}
                  />
                  <span>Heavy Condition (+$50)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-3 rounded bg-white text-black"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <input
                className="w-full p-3 rounded bg-white text-black"
                placeholder="Markup"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
              />
            </div>

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Labor cost"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
            />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Base Quote</p>
                <p className="text-3xl font-bold">${results.finalPrice.toFixed(2)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Recommended Quote</p>
                <p className="text-3xl font-bold">${results.recommendedQuote.toFixed(2)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Labor Cost</p>
                <p className="text-3xl font-bold">${results.laborCostNum.toFixed(2)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Suggested Cleaner Pay</p>
                <p className="text-3xl font-bold">${results.cleanerPaySuggested.toFixed(2)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Profit</p>
                <p className="text-3xl font-bold">${results.profit.toFixed(2)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm mb-1">Margin</p>
                <p className="text-3xl font-bold">{results.margin.toFixed(1)}%</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5 md:col-span-2">
                <p className="text-zinc-400 text-sm mb-1">Estimated Hours</p>
                <p className="text-3xl font-bold">{results.hoursEstimate.toFixed(1)}</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5 md:col-span-2">
                <p className="text-zinc-400 text-sm mb-1">Profit Warning</p>
                <p className={`text-2xl font-bold ${results.profitWarningColor}`}>
                  {results.profitWarning}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Pricing Breakdown</p>
              <div className="space-y-2 text-sm">
                <p>Base from Sq Ft: ${results.baseFromSqft.toFixed(2)}</p>
                <p>Urgency Fee: ${results.urgencyFee.toFixed(2)}</p>
                <p>Extras Total: ${results.extrasTotal.toFixed(2)}</p>
                <p>Travel Fee: ${results.travelPresetFee.toFixed(2)}</p>
                <p>Markup: ${(Number(markup) || 0).toFixed(2)}</p>
                <p>Discount: ${(Number(discount) || 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Quote Summary</p>
              <pre className="whitespace-pre-wrap text-sm text-white font-sans">
                {results.summary}
              </pre>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={copySummary}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Copy Internal Summary
                </button>

                <button
                  onClick={copyClientQuote}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Copy Client Quote
                </button>

                <button
                  onClick={saveQuote}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                >
                  Save Quote
                </button>

                <button
                  onClick={resetForm}
                  className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Client-Facing Quote</p>
              <pre className="whitespace-pre-wrap text-sm text-white font-sans">
                {results.clientFacingQuote}
              </pre>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-4">Saved Quotes (Session Only)</p>

              {savedQuotes.length === 0 ? (
                <p className="text-sm text-zinc-500">No saved quotes yet.</p>
              ) : (
                <div className="space-y-4 max-h-[900px] overflow-y-auto pr-2">
                  {savedQuotes.map((quote) => (
                    <div key={quote.id} className="border border-zinc-800 rounded-xl p-4">
                      <p className="font-semibold">
                        {quote.clientName || "Unnamed Client"}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {quote.clientPhone || "No phone"}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Saved: {quote.savedAt}
                      </p>

                      <div className="mt-3 text-sm space-y-1">
                        <p>Base Quote: ${quote.baseQuote.toFixed(2)}</p>
                        <p>Recommended Quote: ${quote.recommendedQuote.toFixed(2)}</p>
                        <p>Profit: ${quote.profit.toFixed(2)}</p>
                        <p>Margin: {quote.margin.toFixed(1)}%</p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => loadSavedQuoteText(quote.summary)}
                          className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-sm"
                        >
                          Copy Internal
                        </button>

                        <button
                          onClick={() => loadSavedQuoteText(quote.clientText)}
                          className="bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded text-sm"
                        >
                          Copy Client
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
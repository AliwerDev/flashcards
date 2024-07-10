type InputValue = string | number | null;

function getLocaleCode() {
  return {
    code: "en-US",
    currency: "UZS",
  };
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();
  if (!inputValue) return "0";
  const number = Number(inputValue);
  const fm = new Intl.NumberFormat(code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(number)
    .replace(/,/g, ".");

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputValue) {
  const { currency } = getLocaleCode();
  if (!inputValue) return "";

  const number = Number(inputValue);

  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace(/,/g, ".");

  return `${formattedNumber} ${currency}`;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat(code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const suffixMap: { [key: string]: string } = {
    K: "k",
    M: "mln",
    B: "mlrd",
    T: "trln",
  };

  const fm = new Intl.NumberFormat(code, {
    notation: "compact",
    maximumFractionDigits: 3,
  }).format(number);

  return fm.replace(/([0-9,.]+)([A-Z])/g, (match, p1, p2) => `${p1} ${suffixMap[p2] || p2.toLowerCase()}`);
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue) {
  if (!inputValue) return "";

  if (inputValue === 0) return "0 Bytes";

  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

export function fPhone(phoneNumber: any): string {
  if (typeof phoneNumber !== "string") return phoneNumber;
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length !== 12) {
    return phoneNumber;
  }
  const match = cleaned.match(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phoneNumber;
}

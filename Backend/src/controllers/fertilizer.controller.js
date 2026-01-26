import axios from "axios";

export const recommend = async (req, res) => {
  const base = process.env.FERTILIZER_ML_GATEWAY_URL;
  if (!base)
    return res
      .status(500)
      .json({ message: "FERTILIZER_ML_GATEWAY_URL not set" });
  const url = `${base.replace(/\/$/, "")}/predict`;
  const headers = { "Content-Type": "application/json" };
  if (req.headers.authorization)
    headers.Authorization = req.headers.authorization;
  try {
    const { data, status } = await axios.post(url, req.body, {
      headers,
      timeout: 30000,
    });
    return res.status(status).json(data);
  } catch (err) {
    if (err.response)
      return res
        .status(err.response.status)
        .json(err.response.data || { message: "Upstream error" });
    if (["ECONNABORTED", "ETIMEDOUT", "ECONNREFUSED"].includes(err.code))
      return res
        .status(503)
        .json({ message: "Fertilizer ML service unavailable" });
    return res
      .status(502)
      .json({ message: "Fertilizer upstream error", error: err.message });
  }
};

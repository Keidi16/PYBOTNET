import axios from 'axios';

export const handler = async (url) => {
  try {
    const KEY =
      'w9d6xnb8z2u5c9jwhs77ut3tpuaspk8fo8obn73dhma4emr557ryjbv7cco538428rozqq';

    const response = await axios.get(
      `https://whatcms.org/API/Tech?key=${KEY}&url=${url}`,
    );

    const results = response.data.results;

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

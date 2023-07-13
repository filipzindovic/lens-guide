const config = useRuntimeConfig()

export const useScenes = () => {
  const scenesData = useState("scenesData", () => [])
  const scenesDataIsLoading = ref(false)
  const fetchScenesData = async () => {
    try {
      scenesDataIsLoading.value = true

      const data = await $fetch(config.public.SCENES_BASE_URL);

      if (data.length) {
        const formattedData = JSON.parse(data)
        scenesData.value = formattedData
      }

      scenesDataIsLoading.value = false
    } catch (error) {
      scenesDataIsLoading.value = false
      console.error(error);
    }
  }

  return {
    fetchScenesData,
    scenesDataIsLoading,
    scenesData
  }
}
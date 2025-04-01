export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch("https://kokoro.liara.run/api/upload", {
        method: "POST",
        body: formData, 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`آپلود تصویر ناموفق بود! سرور: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("خطا در آپلود تصویر:", error);
      throw error;
    }
  };
  
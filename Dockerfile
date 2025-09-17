# Sử dụng Node.js base image
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json để cài dependencies trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Expose port (ví dụ bạn chạy server ở port 3000)
EXPOSE 3000

# Lệnh khởi chạy server
CMD ["node", "src/server.js"]

import requests


def upload_file(file_path, upload_url):
    with open(file_path, "rb") as file:
        files = {"image": file}
        response = requests.post(upload_url, files=files)
        return response.json()


if __name__ == "__main__":
    # 예시 파일 경로
    file_path = "0df5727c1dd0734db4c7ffb0c874c8ee7c8481254ace7c3c618588a2d6be22bd.jpg"
    # 업로드 URL (API_VERSION은 .env 파일에 설정된 값과 일치해야 합니다)
    upload_url = "http://localhost:3000/api/v1/images/upload"

    # 파일 업로드
    response = upload_file(file_path, upload_url)
    print(response)

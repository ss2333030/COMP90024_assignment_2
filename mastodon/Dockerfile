FROM python:3.10.6
WORKDIR /mastodon
COPY . /mastodon
RUN pip install couchdb;\
    pip install Mastodon.py==1.8.1;\
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu;\
    pip install -q transformers;\
    chmod +x run.sh
CMD ./run.sh

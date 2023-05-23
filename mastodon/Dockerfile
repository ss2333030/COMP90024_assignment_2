FROM python:3.10.6
WORKDIR /mastodon
COPY . /mastodon
RUN pip install couchdb;\
    pip install Mastodon.py;\
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu;\
    pip install transformers;\
    pip install xformers;\
    chmod +x run.sh
CMD ./run.sh

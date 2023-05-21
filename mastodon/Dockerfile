FROM python:3
WORKDIR /mastodon
COPY . /mastodon
RUN pip install couchdb;\
    pip install Mastodon.py;\
    pip install --force-reinstall -v "Mastodon.py==1.1.0";\
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu;\
    pip install transformers;\
    pip install xformers;\
    chmod +x run.sh
CMD ./run.sh

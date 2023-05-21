#!/bin/bash

ansible-galaxy collection install openstack.cloud:1.10.0  # install openstack collection
ansible-galaxy collection install community.docker
. ./openrc.sh; ansible-playbook playbook.yaml -i inventory/inventory --ask-become-pass
#!/bin/bash

# ansible-galaxy collection install openstack.cloud  # install openstack collection
. ./openrc.sh; ansible-playbook playbook.yaml -i inventory/inventory --ask-become-pass
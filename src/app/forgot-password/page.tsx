'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';

const ForgotPassword = () => {
	return (
		<div>
			{/* <ForgotPasswordLink /> */}
			<ForgotPasswordForm />
		</div>
	);
};

export default ForgotPassword;

export interface WelcomeLayoutViewProps {
	showMessage :boolean
	messageHeader :string | null
	messageContent :string | null
	messageIcon :string | null
	messagePositive :boolean
	children :any
}